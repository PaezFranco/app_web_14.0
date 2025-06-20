
// import UserForm from './module/user/UserForm'; 

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'






// const App: React.FC = () =>  {
//   const [count, setCount] = useState(0)

  
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li><Link to="/users">Usuarios</Link></li>
//           <li><Link to="/products">Productos</Link></li>
//           <li><Link to="/orders">Órdenes</Link></li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/users" element={<UserForm />} />
//         <Route path="/products" element={<ProductTable />} />
//         <Route path="/orders" element={<OrderTable />} />
//       </Routes>
//     </Router>
//   );
// }



// export default App

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importa tus componentes (asegúrate de que existan)
import UserForm from './module/user/UserForm';
import ProductTable from './module/product/Product/ProductTable';
import OrderTable from './module/order/OrderTable';

const App: React.FC = () => {
 // eslint-disable-next-line no-empty-pattern
 const [] = useState(0);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Órdenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UserForm />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/orders" element={<OrderTable />} />
      </Routes>
    </Router>
  );
};

export default App;
