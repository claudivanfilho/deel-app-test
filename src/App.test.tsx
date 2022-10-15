import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as ApiService from "./services/api.service";

test("should renders component when initiated", () => {
  render(<App />);
  expect(screen.getByText(/search for a pokemon/i)).toBeInTheDocument();
});

test("should open the options list when typed a search with results", async () => {
  render(<App />);
  const spy = jest.spyOn(ApiService, "fetchPokemons").mockResolvedValue([
    { name: "ratata", url: "" },
    { name: "raticate", url: "" },
  ]);
  const input = screen.getByTestId("search-input");
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "ra" } });

  await screen.findByText("Loading...");
  expect(spy).toBeCalledWith("ra", expect.anything());
  await screen.findByTestId("options-list");
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});

test("should not open the options list when typed a search without results", async () => {
  render(<App />);
  const spy = jest.spyOn(ApiService, "fetchPokemons").mockResolvedValue([]);
  const input = screen.getByTestId("search-input");
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "ra" } });

  await screen.findByText("Loading...");
  expect(spy).toBeCalledWith("ra", expect.anything());
  await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
  expect(screen.queryByTestId("options-list")).not.toBeInTheDocument();
});
