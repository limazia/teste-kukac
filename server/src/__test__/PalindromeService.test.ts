import { isPalindrome, savePalindromes } from '../service/PalindromeService'

describe('PalindromeService', () => {
  it('deve verificar se um número é um palíndromo', () => {
    expect(isPalindrome(121)).toBe(true)
    expect(isPalindrome(123)).toBe(false)
    expect(isPalindrome(1)).toBe(true)
    expect(isPalindrome(0)).toBe(true)
  })

  it('deve salvar números palíndromos no intervalo corretamente', () => {
    const palindromes = savePalindromes(10, 20)

    expect(palindromes).toEqual([11, 22])
  })

  it('deve salvar números palíndromos no intervalo de um único número corretamente', () => {
    const palindromes = savePalindromes(5, 5)

    expect(palindromes).toEqual([5])
  })

  it('deve retornar uma matriz vazia para um intervalo sem números palíndromos', () => {
    const palindromes = savePalindromes(25, 30)

    expect(palindromes).toEqual([])
  })
})
