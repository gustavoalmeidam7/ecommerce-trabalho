#!/bin/bash

(
    cd ./back-end || exit
    docker build -t gustavo/api-ecommerce .
)

(
    cd ./front-end/cliente || exit
    docker build -t gustavo/front-ecommerce-cliente .
)

(
    cd ./front-end/controle || exit
    docker build -t gustavo/front-ecommerce-controle .
)