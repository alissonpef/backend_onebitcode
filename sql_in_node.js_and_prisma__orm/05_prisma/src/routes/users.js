const { Router } = require("express");
const prisma = require("../database");

const router = Router()

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post("/", async (req, res) => {
  const { name, email } = req.body
  const newUser = await prisma.user.create({
    data: {
      name,
      email
    }
  })
  res.status(201).json(newUser)
})

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +req.params.id
    },
    include: {
      posts: true
    }
  })
  res.json(user)
})

router.put("/:id", async (req, res) => {
  const { name, email } = req.body
  const updatedUser = await prisma.user.update({
    data: { name, email },
    where: { id: Number(req.params.id) }
  })
  res.json(updatedUser)
})

router.delete("/:id", async (req, res) => {
  const deletedUser = await prisma.user.delete({
    where: { id: Number(req.params.id) }
  })
  res.json({ deletedUser })
})

router.get("/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true }
  })
  res.json(post)
})

router.put("/:id", async (req, res) => {
  const updatedPost =await prisma.post.update({
    data: req.body,
    where: { id: Number(req.params.id )}
  })
  res.json(updatedPost)
})

router.delete("/:id", async (req, res) => {
  const deletedPost = await prisma.post.delete({
    where: { id: Number(req.params.id) }
  })
  res.json({ deletedPost })
})

module.exports = router