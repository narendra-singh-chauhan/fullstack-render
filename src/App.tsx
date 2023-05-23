// packages
import { useEffect, useState } from 'react';
// css
import './App.css';


// types
type Account = {
  firstName: string,
  lastName: string,
  email: string,
  mobile: string,
  age: number,
  designation: string,
};

const App = () => {
  const [account, setAccount] = useState<Account | null>(null);

  const getAccount = async () => {
    try {
      const apiURL = import.meta.env.VITE_APP_API_URL || '';
      const response = await fetch(`${apiURL}/account`);
      const data: Account = await response.json();
      setAccount(data)
    } catch (error) {
      setAccount(null);
      console.log('Error while fetching account information.');
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div>
      {account ? (
        <div>
          <h2>{account?.firstName} {account?.lastName}</h2>
          <h2>{account?.email}</h2>
          <h2>{account?.mobile}</h2>
          <h2>{account?.age}</h2>
          <h2>{account?.designation}</h2>
        </div>
      ) : (
        <div>
          No Account Found
        </div>
      )}
    </div>
  );
};

export default App;
