# ChatApp
This my version of a chat application.
Basic idea is to work with two arrays, a client and chatHistory we then update them and send to all users,
using WS.
The users can delete and edit messages. If a message is "deleted" the content of the chatHistory is changed,
and a message brodcasted saying the "Robert deleted the message", so there is no need for slicing or splicing,
and the delete message will be visible to all.

## Extra tasks
The only extra task i did was an alternative look.

## Time in total
In total about 5.5 hours about 4 hours for core functions and basic looks,
then rest was on the design of the alternative look.

## To Run.

its a basic
 - "npm install" to get the packages
 - npm run start and get you IP address
 - In both Chat.js and Lobby.js add the IP address to the "const URL"
 - go to /src and do "node server.js"
 - Then you are good to go!

# Chat
- Task: implement a chat client and server
- Position: front-end developer at Pexip

## Constraints

- You have to work on the task yourself, independently
- We expect you to spend around 4 hours.
- If you get excited and want to spend more time that is perfectly fine, just make sure to tell us roughly how much time you've spent on this
- Use any programming language to implement the server
- Avoid using a library to handle socket events for the front end
- Use either TypeScript or JavaScript
- If you're going to use a front end framework we would prefer it to be React, but use whatever framework you are most comfortable with. Vanilla Javascript is also accepted.
- You must use a git repository and commit frequently
- No rush, please come back to us whenever you have had time to look into this
- KISS: Keep It Simple

## Evaluation

- The primary goal of this exercise is to see how you work and structure your code as well as determine your technical skills.
- We want to go through the code with you in a following interview to discuss your technique and choices.

## Main tasks

- Implement a chat service, that supports at least 2 different devices at the same time
- You should be able to edit your own messages. Other particpants should see that the message was edited
- You should be able to delete your own messages. Other particpants should see that the message was deleted
- List of active participants to show who is in the session right now
- Style the chat to look like the provided design

## Bonus tasks (if you have time to spare)

If you want to spend more time on this you could implement any of these features

- Image support
- Fetch URLs and display a page preview on link hover
- Emojis
- Giphy support
- Alternative layouts / themes
- End to end encryption
