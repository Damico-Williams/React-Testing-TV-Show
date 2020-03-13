import React from "react";
import { render, fireEvent, wait} from "@testing-library/react";
import App from "./App.js";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import {data} from "./mockData.js";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event"



jest.mock("./api/fetchShow.js");

test("renders app", () => {
    act(() => {
        mockFetchShow.mockResolvedValue(data)
    })
    
    render(<App/>)
});

test("correct episodes populate when you choose season", async () => {

    mockFetchShow.mockResolvedValueOnce(data)

    const {getByTestId, getByText} = render(<App/>)
    await wait(() => {getByText(/Select a season/i)})
    const dropDown = getByText(/Select a season/i)
    userEvent.click(dropDown)
    // fireEvent.click(findByText(/select a season/i))
    const text = getByText(/Season 1/i);
    expect(text).toBeInTheDocument();
    userEvent.click(text)
    getByText(/Season 1, Episode 1/i)
})


