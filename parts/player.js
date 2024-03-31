class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.player = props.player;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector;
  }
  createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
      $tag.classList.add(className);
    }
    return $tag;
  }
  changeHP(number) {
    if (this.hp > 0) {
      this.hp -= number;
    }
    if (this.hp < 0) {
      this.hp = 0;
    }
    return this.hp;
  }
  elHP() {
    return document.querySelector(`.${this.selector} .life`);
  }
  renderHP(property) {
    this.elHP().style.width = this.changeHP(property) + "%";
  }

  createPlayer() {
    const $player = this.createElement("div", this.selector),
      $progressbar = this.createElement("div", "progressbar"),
      $character = this.createElement("div", "character"),
      $life = this.createElement("div", "life"),
      $name = this.createElement("div", "name"),
      $img = this.createElement("img");

    $img.src = this.img;
    $name.innerText = this.name;
    $life.style.width = this.hp + "%";
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    const $root = document.querySelector(`.${this.rootSelector}`);
    $root.appendChild($player);

    return $player;
  }
}

export const player1 = new Player({
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "https://i.pinimg.com/originals/d4/81/ae/d481ae0488705bd697f7dc4e4611beb4.gif",
  weapon: ["Kunai on a chain", "Fire"],
  rootSelector: "arenas",
});
export const player2 = new Player({
  player: 2,
  name: "Subzero",
  hp: 100,
  img: "https://i.pinimg.com/originals/c2/23/14/c2231481562bb473029321e60f844b9e.gif",
  weapon: ["ice sword", "ice"],
  rootSelector: "arenas",
});
