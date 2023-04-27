import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "@/data/protocols/http";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue<any>({}),
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const sut = makeSut();
    const response = mockPostRequest();
    await sut.post(response);
    expect(mockedAxios.post).toBeCalledWith(response.url, response.body);
  });
});
