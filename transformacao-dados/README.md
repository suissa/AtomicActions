# Transformação de Dados para Iniciantes



## TOMO I 

Para explicar de forma simples e lúdica irei utilizar como massa de dados o retorno de uma 
requisição na [API do Redtube](http://api.redtube.com/) onde teremos, como exemplo, esse objeto:

```js
{
    "video": {
        "duration": "14:08",
        "views": "43110",
        "video_id": "1103943",
        "rating": "3.86",
        "ratings": "236",
        "title": "Loira dando o bucet&atilde;o e o c&uacute; de quatro",
        "url": "http://www.redtube.com/1103943",
        "embed_url": "https://embed.redtube.com/?id=1103943",
        "default_thumb": "https://thumbs-cdn.redtube.com/m=e0YH8f/_thumbs/0001103/1103943/1103943_004o.jpg",
        "thumb": "https://thumbs-cdn.redtube.com/m=e0YH8f/_thumbs/0001103/1103943/1103943_004o.jpg",
        "publish_date": "2017-02-11 13:30:01",
        "tags": [
          {
            "tag_name": "Amateur"
          },
          {
            "tag_name": "Anal Sex"
          },
          {
            "tag_name": "Big Ass"
          },
          {
            "tag_name": "Brazilian"
          },
          {
            "tag_name": "Couple"
          },
          {
            "tag_name": "Homemade"
          },
          {
            "tag_name": "Latin"
          },
          {
            "tag_name": "POV"
          },
          {
            "tag_name": "Shaved"
          },
          {
            "tag_name": "Vaginal Sex"
          }
        ]
      }
  }
  
```



Ao final desse conteúdo vc deverá estar apto a resolver o seguinte problema:


>Liste quais vídeos possuem duração entre 2 e 5 minutos, que possui pelo menos 100 `views` com 
>uma média de avaliação maior que 2 e sua publicação foi na última semana.

Para resolver essa pendenga precisaremos basicamente de 3 funções:

- map
- filter
- reduce


### filter

- filtrar
  + por `duration`
    * menor que
    * maior que
    * entre dois valores


> Irei ensinar como filtrar por `duration` e o resto dos outros filtros vc terá que fazer!

Então vamos começar pelo `menor que`, ou seja, pela duração máxima:

```js

const filterByMaxDuration = ( videos, max ) => {

  const byMaxDuration = ( obj ) => obj.video.duration.split(':')[0] <= max

  return  videos.filter( byMaxDuration )

}

console.log('filterByMaxDuration', filterByMaxDuration(videos, 2) )
```

Obviamente vc percebeu que ele testa apenas os minutos, para transformar todas as durações em 
segundos teremos que usar o `map` e isso é um pouco mais para frente.

Na função `filterByMaxDuration` pegamos o valor da duração com `obj.video.duration` para depois 
executarmos o `.split(':')` para separar os minutos dos segundos e com `[0]` pegamos apenas o 
valor dos minutos. 

Logo ela só irá retornar videos com duração, dos minutos, menor ou igual ao valo passado para 
`filterByMaxDuration`.

Agora ficou fácil fazer as outras funções:

```js
const filterByMaxDuration = ( videos, max ) => {

  const byMaxDuration = ( obj ) => obj.video.duration.split(':')[0] <= max

  return  videos.filter( byMaxDuration )

}

const filterByMinDuration = ( videos, min ) => {

  const byMinDuration = ( obj ) => obj.video.duration.split(':')[0] >= min

  return  videos.filter( byMinDuration )

}

const filterByRangeDuration = ( videos, min, max ) => {

  const byRangeDuration = ( obj ) =>  obj.video.duration.split(':')[0] >= min
                                                      && obj.video.duration.split(':')[0] <= max

  return  videos.filter( byRangeDuration )

}

```


Para melhorar isso podemos criar uma função de mediação para termos apenas 1 função de filtragem 
pela duração, por exemplo:

```js

const filterDurationBy = ( videos, type, initial=0, end=0) => {

  switch ( type ) {
    case 'range':
      return filterByRangeDuration( videos, initial, end )
      break;
    case 'max':
      return filterByMaxDuration( videos, initial )
      break;
    case 'min':
      return filterByMinDuration( videos, initial ) 
      break;
    default:
      return console.log('Essa opção não existe!')
      break;
  }
}
console.log('\n\n\n filterDurationBy', filterDurationBy(videos, 'min', 40) )
console.log('\n\n\n filterDurationBy', filterDurationBy(videos, 'max', 2) )
console.log('\n\n\n filterDurationBy', filterDurationBy(videos, 'range', 40, 50) )

```

Deixando nosso módulo final e refatorado assim:

```js

const filterDurationBy = ( videos, type, initial=0, end=0) => {

  const byMaxDuration = ( obj ) => obj.video.duration <= initial
  const byMinDuration = ( obj ) => obj.video.duration >= initial
  const byRangeDuration = ( obj ) =>  obj.video.duration >= initial
                                                        && obj.video.duration <= end


  const filterDurationByMax = ( videos, max ) => videos.filter( byMaxDuration )
  const filterDurationByMin = ( videos, min ) => videos.filter( byMinDuration )
  const filterDurationByRange = ( videos, min, max ) => videos.filter( byRangeDuration )

  switch ( type ) {
    case 'range':
      return filterDurationByRange( videos, initial, end )
      break;
    case 'max':
      return filterDurationByMax( videos, initial )
      break;
    case 'min':
      return filterDurationByMin( videos, initial ) 
      break;
    default:
      return console.log('Essa opção não existe!')
      break;
  }
}

```

Percebeu que eu separei as funções de filtragem para ficar mais legível e de fácil manutenção?


**Entretanto ainda podemos melhorar atomizando cada função de `filter` assim:**


```js

const filterDurationBy = ( initial=0 ) => ( obj ) =>  obj.video.duration <= initial

module.exports = filterDurationBy

```

```js

const filterDurationBy = ( initial=0 ) => ( obj ) =>  obj.video.duration >= initial

module.exports = filterDurationBy

```

```js

const filterDurationBy = ( initial=0, end=0 ) => ( obj ) =>  obj.video.duration >= initial
                                                                                      && obj.video.duration <= end

module.exports = filterDurationBy

```


**Para que possamos utiliza-las da seguinte forma:**

```js
const filterByDuration = ( videos, type, initial=0, end=0) => {

  const byMaxDuration = require('./actions/filterDurationByMax')
  const byMinDuration = require('./actions/filterDurationByMin')
  const byRangeDuration = require('./actions/filterDurationByRange')

  const filterByMaxDuration = ( videos, max ) => videos.filter( byMaxDuration(initial) )
  const filterByMinDuration = ( videos, min ) => videos.filter( byMinDuration(initial) )
  const filterByRangeDuration = ( videos, min, max ) => videos.filter( byRangeDuration(initial, end) )

  switch ( type ) {
    case 'range':
      return filterByRangeDuration( videos, initial, end )
      break;
    case 'max':
      return filterByMaxDuration( videos, initial )
      break;
    case 'min':
      return filterByMinDuration( videos, initial ) 
      break;
    default:
      return console.log('Essa opção não existe!')
      break;
  }
}

module.exports = filterByDuration

```


> **Agora é a sua vez de fazer as outras funçōes!**


#### Exercícios

```

1) Criar as funções abaixo para filtrar, de forma atômica e modular.

2) Criar 1 exemplo para cada filter

```


1)
- por `views`
  + menor que
  + maior que
  + entre dois valores
- por `ratings`
  + menor que
  + maior que
  + entre dois valores
- por `publish_date`
  + menor que
  + maior que
  + entre dois valores

### map

Será com o `map` que conseguiremos modificar os valores já existentes, por exemplo:

- transformar HH:MM:SS em **segundo**

Sabendo que os valores são separados por `:`,  iremos criar uma função que os separa, por exemplo:

```js

const breakDuration = ( obj ) => obj.video.duration.split(':')

```

Com o retorno dessa função já saberemos se a duração possui apenas segundos ou minutos ou horas, 
apenas verificando o tamanho do *Array* retornado. Agora ficou fácil fazermos essa função, olhe:

```js

const transformToSeconds = ( obj ) => {
  const time = obj.video.duration.split(':')
  let seconds = 0

  if ( time.length === 3 ) {
      seconds += parseInt( time[0] * 3600 )
      seconds += parseInt( time[1] * 60 )
      seconds += parseInt( time[2] )
    }
  if ( time.length === 2 ) {
      seconds += parseInt( time[0] * 60 )
      seconds += parseInt( time[1] )
    }
    obj.video.duration = seconds
    return obj
}


const transformDuration = ( obj ) => obj.map( transformToSeconds )

console.log('\n\n\n transformDuration', transformDuration(videos) )

```


Claro que podemos melhora-la! Perceba aqueles `ifs`, o segundo `if` não é necessário pois mesmo 
que a duração possua apenas segundos ela virá **SEMPRE** com 0 nos minutos, logo podemos deixar assim:

```js

const transformToSeconds = ( obj ) => {
  const time = obj.video.duration.split(':')
  let seconds = 0

  if ( time.length === 3 ) 
    seconds += parseInt( time[0] * 3600 )
    
  seconds += parseInt( time[0] * 60 )
  seconds += parseInt( time[1] )

  obj.video.duration = seconds
  return obj
}

module.exports = transformToSeconds

```


Vamos exportar essa função que usaremos direto no `map`, em conjunto do nosso `filter`, ficando assim:

```js

const {videos} = require('./../jsons/redtube.brazil.json')

const filterDuration = require('./filter.duration.seconds')
const transformDuration = require('./map.duration')

const myVideos = ( videos, type, min, max ) => 
  filterDuration( videos.map( transformDuration ), type, min, max )

const type = 'range'
const min = 30
const max = 60

console.log('myVideos', myVideos( videos, type, min, max ))

```


> **Percebeu que estou usando outro módulo de `filter`?**


Salvei como o nosso antigo, retirando apenas o `split` pois nesse módulo ele irá trabalhar diretamente
com segundos, por isso existiu essa necessidade de modificação.

```js

const byMaxDuration = ( obj ) => obj.video.duration <= initial
const byMinDuration = ( obj ) => obj.video.duration >= initial
const byRangeDuration = ( obj ) =>  obj.video.duration >= initial
                                                        && obj.video.duration <= end

```

Agora veja como iremos utilizar essas funções:

```js

const {videos} = require('./../jsons/redtube.brazil.json')

const filterDurationByRange = require('./actions/filterDurationByRange.js')(30, 60)
const transformDuration = require('./map.duration')

const myVideos = ( videos ) => videos
                                                    .map( transformDuration )
                                                    .filter( filterDurationByRange )


console.log('myVideos', myVideos( videos ))

```


> **Percebeu algo de diferente?**


Então analise esse código: `require('./actions/filterDurationByRange.js')(30, 60)`

Note que modularizei **APENAS** a função `filterDurationByRange` e para conseguir pegar o `min` e `max` 
precisamos criar um módulo que receba esses valores e depois retorne a função que usaremos.


```js

const filterDurationBy = ( initial=0, end=0 ) => ( obj ) =>  obj.video.duration >= initial
                                                                                      && obj.video.duration <= end


module.exports = filterDurationBy

```

Com isso a função que usaremos no `filter` terá acesso aos valores de `min` e `max` pois vc criou uma: [CLOSURE]()


#### Exercícios

```

1) Criar 1 função
3) Criar 1 exemplo para cada filter com map



```



### reduce




## TOMO II

Imagine que vc recebe uma entrada que é um Objeto.

- determinar quais campos quero o valor
- selecionar determinados campos no Objeto
- retornar esses valores

```js

// determinar quais campos quero o valor
const fields = ['age']

```

Perceba que (*quase*) sempre encapsulamos um valor *"comum"* em um *Array*, já 
veremos o porquê disso!

Agora precisamos achar esses `fields` no Objeto de entrada, para isso utilizamos a função 
[Object.keys](), a qual passamos nosso Objeto e ela retornará um *Array* com os nomes dos
campos existentes nesse Objeto, por exemplo:

```js

Object.keys( {a:1, b: 2, c: true} )
// [ 'a', 'b' , 'c']
```

Por isso encadeamos a função [filter]()! Para selecionar quais campos, que definimos, existem 
nesse Objeto de entrada, logo nosso código ficará assim:

```js

const data = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

Object.keys( data ) // [ 'name', 'password' , 'age']
            .filter( /* funcao paran filtarar usando  fields */ )

```

Sabendo que a função [filter]() retorna apenas os valores que o teste lógico define como
verdadeiro, então basta pensarmos no **MODO FILTER** par criarmos essa função.

Precisamos testar algo e **APENAS** retornarmos: `true` ou `false`. Caso o valor seja 
`true` então o valor que esta sendo iterado do *Array* será retornado, por exemplo:

```js

const impares = ( numero ) => (numero % 2 === 0)

[1,2,3,4,5,6,7,8,9].filter( impares )
// [ 2, 4, 6, 8 ]

```

O operador de [% eh o operador de módulo](), o qual testa o **resultado de uma divisão**, no 
caso cada valor do *Array* se o resultado da sua divisão **IGUAL** a 0, indicando que esse 
número é... **PAR**!


> Porque qualquer número dividido por 2 **É PAR**!


Sabendo disso vamos aplicar o mesmo conceito para encontrar os campos definidos no Objeto:


```js

const data = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )

Object.keys( data ) // [ 'name', 'password' , 'age']
            .filter( getFields ) // [ 'age' ]


```


Antes de continuarmos vamos encapsular essa lógica em uma função:


```js

const data = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )


const transform = ( _data, fields ) => {
  
  return Object.keys( _data ) // [ 'name', 'password' , 'age']
                  .filter( getFields ) // [ 'age' ]
  }


console.log('transform(data)', transform( data, fields ))

```


Agora vamos ao que interessa, pegar o valor definido anteriormente, para isso usaremos a função 
[map]() a qual retornará como resposta um *Array* novo com os valores definidos na sua função, 
como visto no exemplo abaixo:

```js

const aoQuadrado = ( numero ) => numero * numero

[1,2,3,4,5,6,7,8,9].map( aoQuadrado )
// [ 1, 4, 9, 16, 25, 36, 49, 64, 81 ]

```


Porém para retornarmos o valor que queremos, precisamos acessar o campo do Objeto, por isso 
precisamos colocar essa função dentro da função que recebe o Objeto, para que possamos pegar 
seus valores, dessa forma:


```js

const obj = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )


const transform = ( data, fields ) => {

  const getValues = ( field ) => data[ field ]
  
  return Object.keys( data ) // [ 'name', 'password' , 'age']
                  .filter( getFields ) // [ 'age' ]
                  .map( getValues ) // [ 666 ]
  }


console.log('transform(obj)', transform( obj, fields ))

```


Com isso temos o **básico do básico** para selecionarmos os valores, e se quisermos adicionar 
um prefixo ao `id`?

Muito simples, vamos criar uma função que receba o valor original e que devolva o valor modificado, 
podemos pensar nessa função assim:

```js

const addPrefix = ( val ) => 'prefix-' + val

```


```js

const obj = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )
const addPrefix = ( val ) => 'prefix-' + val


const transform = ( data, fields ) => {

  const getValues = ( field ) => data[ field ]
  
  return Object.keys( data ) // [ 'name', 'password' , 'age']
                  .filter( getFields ) // [ 'age' ]
                  .map( getValues ) // [ 666 ]
                  .map( addPrefix ) // [ 'prefix-666' ]
  }


console.log('transform(obj)', transform( obj, fields ))

```


Agora vc deve se perguntar:

> Mas como retorno o Objeto com esse valor modificado?


**ÓTIMA PERGUNTA!!!**

Para resolver esse problema vamos criar uma função que **sobrescreva** esse valor no Objeto 
original, só existe um porém:

>
> Os dados são imutáveis!
> 
> E agora José?
>

Basta **recriarmos** o Objeto original, sobrescrevendo os campos que queremos.

> 
> Mas como fazer isso?
> 

Uma técnica que podemos utilizar é a do `Object.assign`, pois o mesmo nos deixa criar Objetos 
novos baseado em um Objeto já existente, por exemplo:

```js

const obj = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const novo = Object.assign( {},  obj)
novo.age = 999

console.log( 'obj.age', obj.age ) // 666
console.log( 'novo.age', novo.age ) // 999

```


Entretanto, o `Object.assign` não modifica o Objeto original, criando um novo com as novas
definições.

Todavia, precisamos pensar nessa função com base no [reduce](), logo teremos pelo menos 
dois parâmetros: *accumulator* e o *current*. Sendo que o valor inicial do *accumulator* pode 
ser definido passando-se esse valor como segundo parâmetro, assim:

```js

[1, 2, 3, 4].reduce(callback, VALOR_INICIAL)

```


Sabendo disso, podemos fazer o seguinte:

```js

reduce( callback, data )

const callback = (acc, cur) => {}

// Pode ser mais facilmente entendida como

const callback = (data, cur) => {}

```


Agora unirmos esse conceito do `reduce` com o `Object.assign` para criarmos uma função que 
irá retornar um objeto NOVO, baseado no Objeto de entrada porém com os valores modificados.

Lembremos que o valor de entrada dessa função será, segundo nosso exemplo: `[ 'prefix-666' ]`.

Logo precisamos antes de tudo criar um Objeto com com o campo e valor novo, levando isso em 
consideração o mais fácil é refatorarmos a função `getValues` para que ela retorna um Objeto com 
o campo e valores desejados, porém como já criamos essa função atômica não iremos sobrescreve-la 
mas sim criar outra parecida, por exemplo:


```js

const getValues = ( field ) => data[ field ]

const getObjectWithValue = ( field ) => ({ [ field ]: data[ field ] })

```


Fazendo uso dessa ideia no nosso exemplo o código ficará assim:


```js

const obj = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )
const addPrefix = ( val ) => 'prefix-' + val
const addPrefixToObject = ( obj ) => 


const transform = ( data, fields ) => {

  const getValues = ( field ) => data[ field ]
  const getObjectWithValue = ( field ) => ({ [ field ]: data[ field ] })
  
  return Object.keys( data ) // [ 'name', 'password' , 'age']
                  .filter( getFields ) // [ 'age' ]
                  .map( getObjectWithValue ) // [ { age: 666 } ]
                  .map( addPrefixToObject ) // [ 'prefix-666' ]
                  //.map( addNewField ) // [ { 'age': 'prefix-666' } ]
  }


console.log('transform(obj)', transform( obj, fields ))


```


Com certeza vc percebeu que teremos que criar outra função baseada na `addPrefix` que trabalhe 
e retorne um Objeto com o valor modificado, podemos fazer assim:


```js

const addPrefix = ( val ) => 'prefix-' + val

const addPrefixToObject = ( obj ) => console.log('addPrefixToObject', obj)

```
