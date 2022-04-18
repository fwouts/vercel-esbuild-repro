import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  testCode: string;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const testCode = "TEST CODE";

  return {
    testCode,
  };
};

export default function Index() {
  const data = useLoaderData() as LoaderData;

  return (
    <main className="grid h-screen place-items-center">
      <div>
        Code is:
        <pre>
          <code>{data.testCode}</code>
        </pre>
      </div>
    </main>
  );
}
