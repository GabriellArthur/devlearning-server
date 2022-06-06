# Back-end do DevLearning

Serviço front-end rodando no link: https://dev-learningbr.vercel.app/

Serviço back-end rodando no link: https://cousers.herokuapp.com/

# Rotas

- users
    - (POST) /signup 
    - (POST) /signin
    - (POST) /googleSignIn
    - (GET) / 
    - (GET) /all 
    - (PATCH) / 
    - (DELE) / 

- curses
    - Sem autenticação
        - (GET) /search
        - (GET) /tag/:tag
        - (POST) /relatedCourses
        - (GET) /
        - (GET) /:id

    - Autenticação
        - (POST) /
        - (DELETE) /:id
        - (PATCH) /:id
        - (GET) /userCourses/:id
        - (PATCH) /like/:id

# Integrantes

Luiz Claudio
Yaman Augusto
Gabriel Arthur
Douglas Figueroa