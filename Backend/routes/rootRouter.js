const router = require("express").Router()
const path = require("path")
router.get("/", (req,res)=>{
const filePath = path.join(`${__dirname}/../views/index.html`)
  res.sendFile(filePath)
})

module.exports = router;
