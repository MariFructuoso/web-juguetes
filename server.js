// server.js
import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Asegúrate de que tu base de datos se llame db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);

// --- MAGIA AQUÍ ---
// Modificamos la respuesta para que siempre sea un objeto { data: ... }
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data
  });
};
// ------------------

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server envuelto está corriendo en http://localhost:3000');
});