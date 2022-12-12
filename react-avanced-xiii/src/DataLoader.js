import { useEffect, useState } from 'react';

export default function DataLoader({ initialState, url, children }) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => setData(result.data));
  }, [url]);

  //return (<WrappedComponent {...props} data={data}/>);
  return children(data);
}
