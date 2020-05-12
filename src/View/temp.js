<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Receita <%= title; %></h1>
    <p>Medico <%= name; %></p>
    <p>Paciente <%= patient; %></p>
    <%= itens.map(i=> i.descr) %>
  </body>
</html>
