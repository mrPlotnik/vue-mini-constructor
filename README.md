# :wrench: :construction: Page mini-constructor. 

Using:
  - Vue CLI,
  - Vue Router,
  - Vuex,
  - ESLint (airbnb),
  - Babel,
  - Mixins,
  - Axios,
  - SASS,
  - Git  
  - REST API.

Web page builder with 3 types of sections (which will be filled directly on the same page)

Available actions with sections:
- can be moved
- can be deleted
- you can create

Section types:

1 section:
Title and content.

2 section:
Card block. The card has a title and description. Each card can be deleted, edited, create a new one.

3 section:
Using the API
https://api.themoviedb.org/3/movie/popular (request returns a list of popular movies in JSON format) display 5 popular movies.

- There is a switch view / edit mode
- In section 2, add the ability to select an icon for any card
- It is possible that after reloading the page, the state of the constructor is not reset.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy to server:
```
bash deploy.sh
```




