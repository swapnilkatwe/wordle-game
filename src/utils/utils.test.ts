import { describe, it, expect } from "vitest";
import { compareGuess, getRandomWord, isGuessedValidWord } from "./utils";

// COMPARE GUESS TESTS
describe("compareGuess", () => {
  it("should return correct letter status for each letter in the guess", () => {
    const word = "ehlla";
    const guess = "hello";
    const expected = ["present", "present", "correct", "correct", "absent"];
    expect(compareGuess(word, guess)).toEqual(expected);
  });
});

describe("compareGuess", () => {
  it("should return all correct letters for correct guess", () => {
    const word = "hello";
    const guess = "hello";
    const expected = ["correct", "correct", "correct", "correct", "correct"];
    expect(compareGuess(word, guess)).toEqual(expected);
  });
});

describe("compareGuess", () => {
  it("should return all absent letters for all wrong guess", () => {
    const word = "fruit";
    const guess = "hello";
    const expected = ["absent", "absent", "absent", "absent", "absent"];
    expect(compareGuess(word, guess)).toEqual(expected);
  });
});

describe("compareGuess", () => {
  it("should handle only one present if you have more of a letter than in the correct answer", () => {
    const word = "water";
    const guess = "otter";
    const expected = ["absent", "absent", "correct", "correct", "correct"];
    expect(compareGuess(word, guess)).toEqual(expected);
  });
});

describe("compareGuess", () => {
  it("should return correct letter", () => {
    const word = "colon";
    const guess = "allol";
    const expected = ["absent", "absent", "correct", "correct", "absent"];
    expect(compareGuess(word, guess)).toEqual(expected);
  });
});

// RANDOM WORD TEST
describe("getRandomWord", () => {
  it("should return a valid random word from the word bank", () => {
    const word = getRandomWord();
    expect(word).toBeDefined();
    expect(word.length).toEqual(5);
  });
});


describe("user guess word",()=> {
  it("should be a valid word",()=>{
    expect(isGuessedValidWord("APPLE")).toBeTruthy();
  });

  it("should be a Invalid word",()=>{
    expect(isGuessedValidWord("AAAAA")).not.toBeTruthy();
  });
});