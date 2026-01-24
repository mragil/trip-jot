import { Page } from '@playwright/test';


const defaultUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://github.com/shadcn.png',
};

const defaultTrip = {
  id: 1,
  name: 'Paris Trip',
  destination: 'Paris, France',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
  isCompleted: false,
  userId: 1,
  activities: [] as any[],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};


export async function setupMocks(page: Page) {
  
  const users = [defaultUser];
  const trips = [defaultTrip];
  let nextTripId = 2;
  let nextActivityId = 1;

  
  await page.route('**/auth/login', async (route) => {
    if (route.request().method() === 'POST') {
        
      const json = { user: users[0] };
      await route.fulfill({ json });
    } else {
      await route.continue();
    }
  });

  await page.route('**/auth/register', async (route) => {
    if (route.request().method() === 'POST') {
      const json = { user: users[0] };
      await route.fulfill({ json });
    } else {
      await route.continue();
    }
  });

  await page.route('**/auth/logout', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 200 });
    } else {
        await route.continue();
    }
  });

  await page.route('**/auth/refresh', async (route) => {
      await route.fulfill({ status: 200 });
  });


  
  await page.route('**/trips', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: { trips } });
    } else if (route.request().method() === 'POST') {
        const data = route.request().postDataJSON();
        const newTrip = { 
            ...data, 
            id: nextTripId++, 
            userId: users[0].id, 
            activities: [], 
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString(),
            isCompleted: false 
        };
        trips.push(newTrip);
        await route.fulfill({ json: newTrip });
    } else {
      await route.continue();
    }
  });

  await page.route('**/trips/*', async (route) => {
      const url = route.request().url();
      const idPart = url.split('/').pop();
      const id = parseInt(idPart || '0', 10);
      
      if (route.request().method() === 'GET') {
           const trip = trips.find(t => t.id === id);
           if (trip) {
               await route.fulfill({ json: trip });
           } else {
               await route.fulfill({ status: 404 });
           }
      } else {
          await route.continue();
      }
  });
  
  
   await page.route('**/activities', async (route) => {
      if (route.request().method() === 'POST') {
          const data = route.request().postDataJSON();
          const newActivity = { ...data, id: nextActivityId++ };
          
          
          const trip = trips.find(t => t.id === Number(data.tripId));
          if (trip) {
              trip.activities.push(newActivity);
          }
          
          await route.fulfill({ json: newActivity });
      } else {
          await route.continue();
      }
  });
}
