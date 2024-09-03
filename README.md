# OpenMusic.Vue

## The first front end for my music web app project
This Vue web-app will consume my OpenMusic.API, as I develop the app I expect the API will change alongside it.

### Project goals
- [x] Allow users to register accounts and login
- [ ] Provide functionality for users to interact with the API to do the following:
    - [x] Search albums playlists, artists and songs
    - [ ] Filter search results
    - [ ] Create playlists and add songs to them
    - [ ] Listen to songs in a playlist format or album format
    - [ ] View artists and albums in more detail
- [ ] Provide meaningful error messages to the user
- [ ] Have a responsive layout with loading animations

## Running this project
For now this project will be interacting with the API when it is running locally, with API calls hard coded to ```https://localhost:7229/api``` so you will have to ensure you change the call strings to match your API port or run the API on the matching port. 
The API is not currently deployed so if you wish to use this you will either have to deploy or run the API yourself.
To run the front-end locally you simply need to clone the repository and open it in VSCode or a similar application.
- Open a new terminal in the base directory and run ```npm run serve```
- The project should now be running locally at the address listed in the terminal
