export default function TabSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>

      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="p-6 space-y-8">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="Soil Solutions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="contact@soilsolutions.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="orderNotif" className="rounded text-sage" defaultChecked />
                <label htmlFor="orderNotif" className="ml-2 text-sm text-gray-700">
                  Order notifications
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="stockNotif" className="rounded text-sage" defaultChecked />
                <label htmlFor="stockNotif" className="ml-2 text-sm text-gray-700">
                  Low stock alerts
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="customerNotif" className="rounded text-sage" />
                <label htmlFor="customerNotif" className="ml-2 text-sm text-gray-700">
                  New customer notifications
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage-dark transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
