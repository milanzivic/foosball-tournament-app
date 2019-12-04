export interface Player {
  name: string;
  email: string;
  skill: number;
}

export interface Bucket extends Array<Player> {

};

export interface Team {
  name: string;
  playerOne: Player;
  playerTwo: Player;
}
