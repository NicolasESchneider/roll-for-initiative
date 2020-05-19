export type Character = {
  id: string
  initiative: number
  name: string
  hp?: number
}

export type CharacterInput = {
  initiative: number
  name: string
  hp?: number
}