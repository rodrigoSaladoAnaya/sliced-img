vertx.createHttpServer().requestHandler { req ->
  def file = req.uri == "/" ? "index.html" : req.uri
  req.response.sendFile "./${file}"
}.listen(8080, "localhost")
println "http://localhost:8080/"