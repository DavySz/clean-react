import { mockAuthentication } from "@/domain/test/mock-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-errors";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    httpPostClientSpy,
    sut,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call httpPostClient with correct url", async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
  test("Should call httpPostClient with correct body", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throws InvalidCredentialsError if httpPostClient return 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
