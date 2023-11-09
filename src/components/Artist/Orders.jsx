import React from 'react';

function Orders() {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="table">
        {/* Head */}
        <thead>
          <tr>
            <th></th>
            <th>User Name</th>
            <th>Post Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          <tr className="bg-base-200">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>$500</td>
            <td>Pending</td>
            <td>123 Main St, City, Country</td>
          </tr>
          {/* Row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>$800</td>
            <td>Approved</td>
            <td>456 Elm St, Town, Country</td>
          </tr>
          {/* Row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>$650</td>
            <td>Processing</td>
            <td>789 Oak St, Village, Country</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
