/*
Szorgalmi feladatok - 3.feladatsor
10. és 11. feladat megoldása
Páll Márton (S2N5O1)
*/

//alaphalmaz
const A = new Set([1, 2, 3, 4, 5])


//reláció
//const R = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [1, 2], [2, 1]]
const R = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [1, 2], [2, 1], [1,3], [3,1], [2,3], [3,2], [1,4], [2,4], [3,4], [4,1], [4,2], [4,3], [4,4]]
const S = [[1,5],[5,2]]

function eq(a, b) {
  const [x1,y1] = a;
  const [x2,y2] = b;
  return x1 === x2 && y1 === y2
}

function contains(A, b){
  return A.some(e => eq(e,b))
}

function reflexiv(P) {
  return [...A].every(x => contains(P, [x,x]))
}

function irreflexiv(P) {
	return [...A].every(x => !contains(P, [x,x]))
}

function szimmetrikus(P){
  return P.every(([x,y]) => contains(P, [y,x]))
}

function antiszimmetrikus(P){
  return P.filter(([x,y]) => x!=y)
          .every(([x,y]) => !contains(P, [y,x]))
}

function szigoruanantiszimmetrikus(P){
  return P.every(([x,y]) => !contains(P, [y,x]))
}

function tranzitiv(P){
  return P.filter(([x,y]) => x!=y)
          .map(([x,y]) => P.filter(([x2,y2]) => x2==y)
                            .map(([x2,y2]) => [x,y2]))
          .flat()
          .every(([x,y]) => contains(P, [x,y]))
}

//----------------------------------------------------------------

function ekvivalenciarelacio(P){
  return reflexiv(P) && szimmetrikus(P) && tranzitiv(P)
}

function ekvivalenciaosztaly(P){
  if(!ekvivalenciarelacio(P))
    return []
  
  const alaphalmaz = new Set([...A])

  const min_relaciok =
      P.filter(([x,y]) => x<y)
       .filter(([x,y]) => alaphalmaz.delete(y))
  
  const osztalyok = [...alaphalmaz].map(e => new Set([e]))

  min_relaciok.forEach(([x,y]) => osztalyok.find(e => e.has(x)).add(y))

  return osztalyok
}

// ----------------------------------------------------------------

console.log("R relacióra")
console.log("reflexiv",reflexiv(R))
console.log("irreflexiv",irreflexiv(R))
console.log("szimmetrikus",szimmetrikus(R))
console.log("antiszimmetrikus",antiszimmetrikus(R))
console.log("szigoruanantiszimmetrikus",szigoruanantiszimmetrikus(R))
console.log("tranzitiv",tranzitiv(R))
console.log("ekvivalenciarelacio",ekvivalenciarelacio(R))
console.log("ekvivalenciaosztaly",ekvivalenciaosztaly(R))

console.log("S relacióra")
console.log("reflexiv",reflexiv(S))
console.log("irreflexiv",irreflexiv(S))
console.log("szimmetrikus",szimmetrikus(S))
console.log("antiszimmetrikus",antiszimmetrikus(S))
console.log("szigoruanantiszimmetrikus",szigoruanantiszimmetrikus(S))
console.log("tranzitiv",tranzitiv(S))
console.log("ekvivalenciarelacio",ekvivalenciarelacio(S))

console.log("üres relációra")
console.log("reflexiv",reflexiv([]))
console.log("irreflexiv",irreflexiv([]))
console.log("szimmetrikus",szimmetrikus([]))
console.log("antiszimmetrikus",antiszimmetrikus([]))
console.log("szigoruanantiszimmetrikus",szigoruanantiszimmetrikus([]))
console.log("tranzitiv",tranzitiv([]))
console.log("ekvivalenciarelacio",ekvivalenciarelacio([]))
