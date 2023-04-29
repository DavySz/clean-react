import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { mockAxios } from "@/infra/test";
import { mockPostRequest } from "@/data/test/mock-http-post";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const { mockedAxios, sut } = makeSut();
    const response = mockPostRequest();
    await sut.post(response);
    expect(mockedAxios.post).toBeCalledWith(response.url, response.body);
  });

  test("Should return the correct status code and body", () => {
    const { mockedAxios, sut } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
