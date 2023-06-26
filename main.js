import "./style.css"
const game = new Game;

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
  
  class Game {
    constructor(props) {
      this.$arenas = document.querySelector(".arenas");
      this.$formFight = document.querySelector(".control");
      this.$chat = document.querySelector(".chat");
      this.HIT = {
        head: 30,
        body: 25,
        foot: 20,
      };
      this.ATTACK = ["head", "body", "foot"];
      this.LOGS = {
        start:
          "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
        end: [
          "[time] Результат удара [playerWins]: [playerLose] - труп",
          "[time] [playerLose] погиб от удара бойца [playerWins]",
          "[time] Результат боя: [playerLose] - жертва, [playerWins] - убийца",
        ],
        hit: [
          "[time] [playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага. [-player.hp] [hp/100]",
          "[time] [playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника. [-player.hp] [hp/100]",
          "[time] [playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага. [-player.hp] [hp/100]",
          "[time] [playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника. [-player.hp] [hp/100]",
          "[time] [playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника. [-player.hp] [hp/100]",
          "[time] [playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника. [-player.hp] [hp/100]",
          "[time] [playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника. [-player.hp] [hp/100]",
          "[time] [playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника. [-player.hp] [hp/100]",
          "[time] [playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага. [-player.hp] [hp/100]",
          "[time] [playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника. [-player.hp] [hp/100]",
          "[time] [playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента. [-player.hp] [hp/100]",
          "[time] [playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника. [-player.hp] [hp/100]",
          "[time] [playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага. [-player.hp] [hp/100]",
        ],
        defence: [
          "[time] [playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу. [hp/100]",
          "[time] [playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь. [hp/100]",
          "[time] [playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке. [hp/100]",
          "[time] [playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь. [hp/100]",
          "[time] [playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку. [hp/100]",
          "[time] [playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение. [hp/100]",
          "[time] [playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют. [hp/100]",
          "[time] [playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение. [hp/100]",
        ],
        draw: "[time] Ничья - это тоже победа!",
      };
      this.player1 = player1;
      this.player2 = player2;
    }
    createElement(tag, className) {
      const $tag = document.createElement(tag);
      if (className) {
        $tag.classList.add(className);
      }
      return $tag;
    }
    playerWins(name) {
      const $playerWins = this.createElement("div", "loseTitle");
      if (name) {
        $playerWins.innerText = name + " wins";
      } else {
        $playerWins.innerText = "draw";
      }
      return $playerWins;
    }
    enemyAttack() {
      const hit = this.ATTACK[this.getRandom(3) - 1];
      const defence = this.ATTACK[this.getRandom(3) - 1];
  
      return {
        value: this.getRandom(this.HIT[hit]),
        hit,
        defence,
      };
    }
    playerAttack() {
      const attack = {};
      for (let item of this.$formFight) {
        if (item.checked && item.name === "hit") {
          attack.value = this.getRandom(this.HIT[item.value]);
          attack.hit = item.value;
          item.checked = false;
        }
        if (item.checked && item.name === "defence") {
          attack.defence = item.value;
          item.checked = false;
        }
      }
      return attack;
    }
    showResult() {
      if (this.player1.hp == 0 || this.player2.hp == 0) {
        this.$formFight.style.display = "none";
        this.createReloadButton();
      }
      if (this.player2.hp == 0 && this.player1.hp != 0) {
        this.$arenas.appendChild(this.playerWins(this.player1.name));
        this.generateLogs("end", 0, this.player1, this.player2);
      } else if (this.player1.hp == 0 && this.player2.hp != 0) {
        this.$arenas.appendChild(this.playerWins(this.player2.name));
        this.generateLogs("end", 0, this.player2, this.player1);
      } else if (this.player1.hp == 0 && this.player2.hp == 0) {
        this.$arenas.appendChild(this.playerWins());
        this.generateLogs("draw", 0, this.player2, this.player1);
      }
    }
    generateLogs(type, fight, { name, hp } = {}, { name: name2 }) {
      const $date = new Date();
      const $time = `${$date.getHours()}:${$date.getMinutes()}:${$date.getSeconds()}`;
  
      let el;
      switch (type) {
        case "start":
          el = this.LOGS[type]
            .replace("[time]", $time)
            .replace("[player1]", name)
            .replace("[player2]", name2);
          break;
        case "end":
          el = this.LOGS[type][this.getRandom(this.LOGS["end"].length) - 1]
            .replace("[time]", $time)
            .replace("[playerWins]", name)
            .replace("[playerLose]", name2);
          console.log(type.length);
          break;
        case "hit":
          el = this.LOGS[type][this.getRandom(this.LOGS["hit"].length) - 1]
            .replace("[time]", $time)
            .replace("[playerDefence]", name)
            .replace("[playerKick]", name2)
            .replace("[-player.hp]", ` - ${fight}HP`)
            .replace("[hp/100]", `${hp}/100`);
  
          break;
        case "defence":
          el = this.LOGS[type][this.getRandom(this.LOGS["defence"].length) - 1]
            .replace("[time]", $time)
            .replace("[playerKick]", name2)
            .replace("[playerDefence]", name)
            .replace("[hp/100]", `${hp}/100`);
  
          break;
        case "draw":
          el = this.LOGS[type].replace("[time]", $time);
          break;
      }
      const $text = `<p>${el}</p>`;
      this.$chat.insertAdjacentHTML("afterbegin", $text);
    }
  
    getRandom(number) {
      return Math.ceil(Math.random() * number);
    }
    createReloadButton() {
      const $reloadWrap = this.createElement("div", "reloadWrap");
      const $reloadButton = this.createElement("button", "button");
  
      this.$arenas.appendChild($reloadWrap);
      $reloadWrap.appendChild($reloadButton);
      $reloadButton.innerText = "Restart";
      $reloadButton.addEventListener("click", function () {
        window.location.reload();
      });
    }
    start() {
      this.player1.createPlayer();
      this.player2.createPlayer();
  
      this.generateLogs("start", 0, this.player1, this.player2);
      this.$formFight.addEventListener("submit", (e) => {
        e.preventDefault();
        const enemy = this.enemyAttack();
        const player = this.playerAttack();
        if (enemy.hit !== player.defence) {
          this.player1.renderHP(enemy.value);
          this.generateLogs("hit", enemy.value, this.player1, this.player2);
        } else {
          this.generateLogs("defence", 0, this.player1, this.player2);
        }
        if (player.hit !== enemy.defence) {
          this.player2.renderHP(player.value);
          this.generateLogs("hit", player.value, this.player2, this.player1);
        } else {
          this.generateLogs("defence", 0, this.player2, this.player1);
        }
        this.showResult();
      });
    }
  }
  
  export default Game;
  

game.start();