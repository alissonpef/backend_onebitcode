const { Router } = require("express");
const prisma = require("../database");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const posts = await prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / pageSize);

    res.json({
      posts,
      pagination: {
        page,
        pageSize,
        totalPosts,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, slug, content, published, authorId, tags } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        authorId,
        tags: tags ? { connect: tags.map(tagId => ({ id: tagId })) } : undefined,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(500).json({ error: "Erro ao criar post" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: true, tags: true },
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    console.error("Erro ao buscar post por ID:", error);
    res.status(500).json({ error: "Erro ao buscar post" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { title, authorId, published, startDate, endDate } = req.query;

    const filter = {};

    if (title) {
      filter.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (authorId) {
      filter.authorId = +authorId;
    }

    if (published) {
      filter.published = published === "true";
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.lte = new Date(endDate);
      }
    }

    const posts = await prisma.post.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
      include: { author: true, tags: true }
    });

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { tags, ...postData } = req.body;
    const id = Number(req.params.id);

    const updatedPost = await prisma.post.update({
      data: {
        ...postData,
        tags: tags ? { set: tags.map(tagId => ({ id: tagId })) } : undefined,
      },
      where: { id },
    });
    res.json(updatedPost);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Post não encontrado para atualização" });
    }
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.post.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Post não encontrado para exclusão" });
    }
    res.status(500).json({ error: "Erro ao deletar post" });
  }
});

module.exports = router;