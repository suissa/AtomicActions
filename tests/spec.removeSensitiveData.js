const expect = require(`chai`).expect
const tester = require(`../actions/removeSensitiveData`)

const describeTitleOneObject = `Remover dados sensíveis de um Objeto`
const fieldsNotAllowed = [`password`]
const valueToTest = null
const data = [
  { name: 'Suissero Veio', password: 'p3g4n4min4', id: 666 },
  { name: 'Charles', password: 'olaaaa', id: 69 }
]
const DATA_CLONE = [
  { name: 'Suissero Veio', password: 'p3g4n4min4', id: 666 },
  { name: 'Charles', password: 'olaaaa', id: 69 }
]

const TestIf = {
  isEqual: (result, valueToTest) => 
    expect( result[fieldsNotAllowed] ).to.equal( valueToTest ),
  isNull: (result) => expect(result).to.be.null,
  isArray: (arr) => Array.isArray(arr)
}

const describeTitleManyObject = `Remover dados sensíveis de vários Objetos`
const fieldsNotAlloweds = [`password`, `id`]

describe( describeTitleOneObject,  () => {

  const fuckThisNOOOOW = () => TestIf.isArray(data) 
                                                        ? data.map( runTheMotherfockerTests )
                                                        : [data].map( runTheMotherfockerTests )

  const runTheMotherfockerTests = (obj, position) => {

    const toFreshNewValues = ( field, i ) => {
          const result = tester(obj, field, valueToTest) 
          const DATA_IN = JSON.stringify(DATA_CLONE[position]) 
          const DATA_OUT = JSON.stringify(result) 
          const testTitle = `Mudar o valor do campo ${field}  para ${valueToTest}

        in: ${DATA_IN}
        out: ${DATA_OUT}

      `
          it( testTitle, () => TestIf.isEqual(result, valueToTest) )
    }

    fieldsNotAlloweds.map( toFreshNewValues )
  }

    return fuckThisNOOOOW()

  }
)
