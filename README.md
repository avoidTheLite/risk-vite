# risk-vite

## Risk Client application using React, Typescript, and Vite:
This application is the client companion to the risk-socket service. This is not a stand-alone application as the majority of game logic is handled on the service.

## Dependencies:
1. Ensure, Node, NPM, and Docker are installed on your system.

2. Clone repo with:
```bash
it clone https://github.com/avoidTheLite/risk-vite.git
```

3. From project directory install dependencies with npm:
```bash
npm install
```

4. Add .env file
```bash
TODO
```

5. Follow instructions to run risk-socket service locally
View the README.md here:
https://github.com/avoidTheLite/risk-socket

6. start client application using:
```bash
npm run dev
```

## Credits
The SVG React component used to render the game is based on the shapes, connections, and text overlays of an SVG by Wikipedia user: Gr0gmint, which was based on an [SVG file](https://commons.wikimedia.org/wiki/File:Risk_game_board.svg)) by Wikipedia user cmglee. Thanks cmglee and Gr0gmint for your contributions to the Risk community!

The [SVG React component](https://github.com/avoidTheLite/risk-vite/blob/main/src/components/Globe/GameMap.tsx) is licensed under the Creative Commons [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
