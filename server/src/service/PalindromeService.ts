export const isPalindrome = (number: number): boolean => {
  const strNum = number.toString()
  const reversedStr = strNum.split('').reverse().join('')

  return strNum === reversedStr
}

export const savePalindromes = (noInicio: number, noFim: number): number[] => {
  const palindromes: number[] = []

  for (let i = noInicio; i <= noFim; i++) {
    if (isPalindrome(i)) {
      palindromes.push(i)
    }
  }

  return palindromes
}
