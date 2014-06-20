<?php

session_start(); //iniciamos a sessão que foi aberta
session_destroy(); //pei!!! destruimos a sessão ;)
session_unset(); //limpamos as variaveis globais das sessões

$result['success'] = true;
$result['errors']['reason'] = 'Até a próxima!';

echo json_encode($result);