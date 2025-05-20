/* Ainda preciso fazer uma função que checa quando todos os espaços estão preenchidos, 
ou seja, deu velha e não tem mais espaços disponíveis para jogar, deveria então mostrar um 
texto dizendo "empate" e o botão de recomeçar
 */

/* Eu vou lotar isso aqui de comentários pq eu aprendi e usei muitas coisas novas das quais provavalmente
vou esquecer em 1 semana se eu não anotar algo sobre elas, então vai ter muito comentario pra cada coisa
talvez até demais */


import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Dimensions,  } from 'react-native';
import React, { useState } from 'react';



let simbolo_proximo = 'X';
let simbolo_atual = 'O';
let can_play = true;
// essa const vitorias é basicamente uma lista de todas as posições que serão consideradas vitórias
// quando todas essas posições estiverem preenchidas com uma mesma letra o jogador dessa letra venceu
const vitorias = [
  // Linhas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Colunas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonais
  [0, 4, 8],
  [2, 4, 6],
];

export default function index(){

  /*essa "const cell, setCell" é para alterar o texto dentro dos blocos, ele começa vazio e conforme
  o usuario aperta ele vai colocando X ou O - dependendo de quem é a vez - na posição do bloco
  a posição do bloco (ou celula) é passado la no View OnPress, onde entre parenteses passamos o index
  como parâmetro*/
  /* o const jogador, setJogador é para alterar o texto de qual jogador venceu, começa vazio e depois
  é alterado para O ou X dependendo de quem ganhou */
  /*o const visivel, setVisivel é para alterar a visibilidade do texto de vitória e do botão de reset */
  const [cell, setCell] = useState(Array(9).fill(""));
  const [jogador, setJogador] = useState("");
  const [visivel, setVisivel] = useState(false);


  //função que é chamada quando o usuario clica em uma celula
  const clicou = (position: number, clear_bool: boolean = false) => {
    //se o usuario pode jogar - ou seja, se não acabou o jogo - o cógido será executado
    if(can_play){

    //define o próximo simbolo com base no simbolo atual, se atualmente esta em O o próximo será X
    if (simbolo_proximo == "O"){
      simbolo_proximo = "X"
      simbolo_atual = "O";
    }
    else{
      simbolo_proximo = "O"
      simbolo_atual = "X";
    }}

    /*"const novocel = [...cell];"Cria uma cópia do array das células antes de altera-lo, sinceramente não entendi muito bem a
    necessidade e o motivo de criar uma cópia, mas em todo lugar dizia que tem q fazer isso, depois vou estudar mais sobre
     */
    const novocell = [...cell];
    if(can_play){
    
    //caso a posição que o usuario clicou esteja vazia, ou seja, pode receber um simbolo, então o 
    //simbolo atual será colocado dentro do array na posição indicada pelo index position
    if(novocell[position] == ""){
      novocell[position] = simbolo_atual;
      setCell(novocell);
    }
    }


    /* isso é para verificar quando uma vitória acontece, ele utiliza aquele array de vitorias lá do começo
    , para cada uma daquelas possibilidades de vitória ele vai verificar se existem 3 letras iguais na 
    posição de vitória, por exemplo, a primeira posição de vitória da lista é  [0, 1, 2] o que significa
    uma linha no topo, ele vai primeiramente verificar se a posição 0 está vazia, caso não esteja significa
    que ela tem uma letra, e então ela verifica se a posição 1 tem uma letra que é igual a letra da posição 0,
    caso seja ela verifica se a posição 2 tem a mesma letra da posição 0, que é também a mesma letra da posição 1
    talvez tenha ficado um pouco confuso mas ela só olha em cada posição e verifica se as três posições possuem
    a mesma letra dentro delas*/
    vitorias.forEach(([a,b,c]) => {
      if(novocell[a] !== "" && novocell[a] === novocell[b] && novocell[a] === novocell[c]){
        /* caso essa condição seja verdadeira ele simplemente verifica qual letra  está na posição a
        , poderia ser em qualquer posição, é só para ver qual letra ganhou, depois disso ele chama
        a função vitória e passa a letra vencedora como parametro para que a função possa mostrar quem 
        venceu na tela */
        if(novocell[a] === "X"){
          vitoria("X")
        }
        else{
          vitoria("O")
        }
        
        /* essa função "clicou" também tem um parametro chamado clear_bool, que é false como padrão, a única vez 
        que esse parametro é passado como true é quando o usuario aperta o botão de resetar o jogo, para que então
        o código chegue nesta parte e execute as duas ações de resetar o jogo, limpar todos os quadrados e deixar
        o texto de vitória e o botão de reset invisíveis de novo
         */
        if(clear_bool){
          clear(novocell)
          setVisivel(false)
        }

      }
    })
  }

  //função que torna o texto de vítoria e botão de reset visivel, mostra quem venceu na tela e impossibilita
  //o usuario de jogar até que ele de reset no jogo
  const vitoria = (jogador_vitorioso: string) => {
      setJogador(jogador_vitorioso)
      setVisivel(true)
      can_play = false;
  }

  //função que passa por cada "célula" do array e coloca o valor dela como uma string vazia: ""
  //também possibilita o usuário de jogar novamente, já que ele apertou o botão reset
  const clear = (board: any) => {
    let i = -1;
        while(i < 9){
          i++;
          board[i] = "";
          setCell(board);
        }
    can_play = true;
  }

 
  //aqui começa a área de vizualização
  //Eu usei esse SafeAreaView para tentar arrumar um problema com a área de notificações do celular porém não funcionou, depois eu vejo isso
  
  //não consegui fazer comentários dentro do return então vou fazer aqui mesmo
  //fiz uma view para as células chamada de board - ela também terá o texto de vitória e botão de reset quando ficarem visiveis
  //coloquei a view board centralizada para que tudo já fosse para o centro de uma vez
  //fiz duas "separações" para as celulas, colunas e linhas basicamente, usei o flex para ordena-las em grupos de 3 desse jeito
  //abaixo das células tem o texto de vitória e o botão de reset, que ficam invisiveis até o jogo acabar
  //interesante notar que o usei dois styles no View que contem esses dois elementos, é como passar um array no style=""
  //o primeiro valor do "array" desse style é o que eu criei para estilo, e o segundo é a condição de estar ou não visivel, caso a variavel visivel seja true ele fica visivel, caso contrario invisivel
  return <SafeAreaView style={styles.container}> 
    
    <View style={styles.header}>
      <Text style={styles.title}>JOGO DA VELHA</Text>
    </View>

    <View>
      <Text>É a vez do jogador: {simbolo_proximo}</Text>
    </View>

    <View style={styles.board}>
    <View style={styles.box}>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(0)}}><Text style={styles.text}>{cell[0]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(1)}}><Text style={styles.text}>{cell[1]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(2)}}><Text style={styles.text}>{cell[2]}</Text></TouchableOpacity></View>
    </View>

    <View style={styles.box}>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(3)}}><Text style={styles.text}>{cell[3]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(4)}}><Text style={styles.text}>{cell[4]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(5)}}><Text style={styles.text}>{cell[5]}</Text></TouchableOpacity></View>
    </View>

    <View style={styles.box}>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(6)}}><Text style={styles.text}>{cell[6]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(7)}}><Text style={styles.text}>{cell[7]}</Text></TouchableOpacity></View>
      <View><TouchableOpacity style={styles.column} onPress={() => {clicou(8)}}><Text style={styles.text}>{cell[8]}</Text></TouchableOpacity></View>
    </View>

    <View style={[styles.victory_box, {opacity: visivel ? 1 : 0}]}>
      <Text style={styles.victory_text}>Vitória do {jogador}</Text>
      <View><TouchableOpacity style={styles.victory_button} onPress={() => {clicou(-1,true)}}><Text>Jogar de novo</Text></TouchableOpacity></View>
    </View>
    </View>

    
  </SafeAreaView>
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },

  header: {
    backgroundColor: 'gray',
    width: screenWidth,
  },

  board: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    gap: 1,
    
  },

  box: {
    gap: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkgray',
  },

  title: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 6,
    fontSize: 50,
    fontFamily: 'cambria',
  },

  text: {
    fontSize: 50,
  },

  victory_box: {
    display: 'flex',
    alignItems: 'center',
    
  },

  victory_text: {
    textAlign: 'center',
    fontSize: 50,
  },

  victory_button: {
    fontSize: 50,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    width: 242,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  }
  
})

//não tem muito o que comentar sobre o CSS, então vou só fazer umas anotações finais aqui
/* nesse projeto aprendi a usar várias coisas novas, algumas delas foram:
const [valor, setValor] = useState();
arrays em tsx, não é diferente do q eu já conhecia, mas foi minha primeira vez usando aqui
loop forEach em tsx
pratiquei mais funções
Aprendi e pratiquei muito sobre a parte "visual" como View ou TouchableOpacity, usei eventos como onPress também
aprendi a usar "textos que mudam", como o nome do vencedor, usando <Text>Vitória do {jogador}</Text>, basicamente texto e váriavel junto, básico mas primeira vez usando aq também
algumas funções especificas de React para ajudar no CSS, como a função de pegar o tamanho da tela do usuário que usei para definir o tamanho do width do header
além de tudo isso pratiquei mais "display: flex," também

O projeto não está completamente pronto ainda, posso deixar bem mais bonito e pretendo refatorar o código quando eu aprender mais sobre, ainda falta criar a "função" de empate, mas isso deve ser fácil
gostei do resultado que consegui até agora, trabalhei por cerca de 5 horas - estudando e programando isso - e 
consegui chegar em um resultado satisfatório sem precisar seguir nenhum tutorial na internet, usei sim muitos 
sites e documentação para aprender coisas novas, mas seria impossível sem isso, o que importa é que aprendi muito com esse projeto */