import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import App from "./App";
import { useWordleStore } from "./store/store";
import { letterStatus } from "./utils/utils";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    expect(screen.getByText(/Wordle game/i)).toBeInTheDocument();
  });

  it("renders the 5x5 grid", () => {
    render(<App />);
    const cells = screen.getAllByTestId("textbox");
    expect(cells).toHaveLength(25);
  });

  it("renders a keyboard with letters A-Z backspace and enter", () => {
    render(<App />);
    const keys = screen.getAllByRole("button");
    expect(keys).toHaveLength(28); // A-Z keys, backspace, and enter
  });

  it.todo("updates the grid when typing letters", async () => {
    render(<App />);
    const keys = screen.getByText("A");
    const firstCell = screen.getAllByRole("textbox")[0];
    await userEvent.click(keys);
    expect(firstCell).toHaveValue("A");
  });

  it("dose not allow to enter more than 5 characters", () => {
    render(<App />);
    const keys = ["A", "B", "C", "D", "E"].map((letter) =>
      screen.getByText(letter)
    );
    keys.forEach((key) => userEvent.click(key));
    const extraKey = screen.getByText("F");
    userEvent.click(extraKey);
    const row = screen.getAllByRole("textbox").slice(0, 5);
    expect(row.map((cell) => (cell as HTMLInputElement).value)).not.toContain(
      "F"
    );
  });

  it("clears each cell when clicking on backspace", async () => {
    render(<App />);
    const keys = ["A", "B", "C", "D", "E"].map((letter) =>
      screen.getByText(letter)
    );

    keys.forEach((key) => userEvent.click(key));
    const backspace = screen.getByText("Backspace");
    await userEvent.click(backspace);
    // screen.debug();

    const row = screen.getAllByTestId("textbox").slice(0, 5);
    // console.log("Row found:", row);

    expect(row.map((cell) => (cell as HTMLInputElement).value)).toEqual([
      "A",
      "B",
      "C",
      "D",
      "",
    ]);
  });

  // GAME OVER TEST
  it("should render the game over state", () => {
    useWordleStore.setState({ guesses: Array(5).fill("APPLE") });
    render(<App />);
    expect(screen.getByText(/game over!/i)).toBeInTheDocument();
  });

  // START NEW GAME TEST
  it("should start a new game", async () => {
    useWordleStore.setState({ guesses: Array(5).fill("APPLE") });
    render(<App />);
    const newGameButton = screen.getByText("New Game");
    await userEvent.click(newGameButton);
    expect(useWordleStore.getState().guesses).toEqual([]);
  });

  // WIN GAME TEST
  it("should win the game", async () => {
    useWordleStore.setState({ answerWord: "APPLE", guesses: [] });
    render(<App />);

    const keys = ["A", "P", "P", "L", "E"].map((letter) =>
      screen.getByText(letter)
    );

    keys.forEach((key) => userEvent.click(key));
    const enter = screen.getByText("Enter");
    await userEvent.click(enter);
    // screen.debug();
    expect(screen.getByText(/you won!/i)).toBeInTheDocument();
  });

  // USER SHOULD NOT GET FEEDBACK BEFORE MAKING A GUESS BY CLICKING ENTER
  it("should not show any feedback before making a guess by clicking enter", async () => {
    useWordleStore.setState({
      answerWord: "APPLE",
      guesses: [{ guess: "ZZZZZ", result: Array(5).fill(letterStatus.absent) }],
    });
    render(<App />);

    const keys = ["A", "P", "P", "L", "E"].map((letter) =>
      screen.getByText(letter)
    );
    keys.forEach((key) => userEvent.click(key));

    // Result empty before the guess is made
    const guess = useWordleStore.getState().guesses;
    expect(guess.length).toEqual(1);

    // Result updated after the guess is made
    const enter = screen.getByText("Enter");
    await userEvent.click(enter);

    const secondGuess = useWordleStore.getState().guesses;
    expect(secondGuess.length).toEqual(2);
  });
});
