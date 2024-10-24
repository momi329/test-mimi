import app from './app';
import accountService from './accountService';

const port = process.env.PORT || 3000;

// 檢查環境變量
const shouldInitializeDummyData = process.env.INITIALIZE_DUMMY_DATA === 'true';

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
  if (shouldInitializeDummyData) {
    accountService.initializeDummyData();
  } else {
    console.log("Skipping dummy data initialization.");
  }

  console.log("Current Accounts:");
  console.log(accountService.getAllAccounts());
});
