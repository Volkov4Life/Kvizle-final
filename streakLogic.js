import { getFirestore, collection, getDoc, getDocs, doc, updateDoc, query, where } from "firebase/firestore"; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; // Import Firebase auth


export const IzracunajStTock = async (difficulty, streak) => {
  try {

    const db = getFirestore();
    const multiplierCollection = collection(db, "streakMultiplier");
    
    // Fetch the single document from the collection
    const docRef = doc(multiplierCollection, "5jPw73pnn5pmWoN8in20"); 
    const docSnap = await getDoc(docRef);
    
    if (streak > 10) streak = 10;

    if (docSnap.exists()) {

      const streakMultiplier = docSnap.data()[streak]; 
      if (!streakMultiplier) {
        throw new Error(`No multiplier found for streak: ${streak}`);
      }

      switch (difficulty) {
        case "Easy":
          return 1 * streakMultiplier;
        case "Medium":
          return 2 * streakMultiplier;
        case "Hard":
          return 3 * streakMultiplier;
      }
    } else {
      throw new Error("Multiplier document does not exist!");
    }
  } catch (error) {
    throw error;
  }
};

export const ZapisiPodatkeVBazo = async (tocke, streak, stZmag, stIger) => {
  try {
    const user = getAuth().currentUser;

    if (user) {
      const userEmail = user.email;

      const db = getFirestore();
      const usersCollection = collection(db, "users");

      const userQuery = query(usersCollection, where("email", "==", userEmail));

      const querySnapshot = await getDocs(userQuery);

      // If a user is found
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        const userData = userDoc.data();

        const updatedStZmag = (userData.stZmag || 0) + stZmag;
        const updatedStIger = (userData.gamesPlayed || 0) + stIger;
        const updatedWR = updatedStZmag / updatedStIger;

        // Calculate updated points, ensuring to add points correctly
        const updatedPoints = (userData.stTock || 0) + tocke; // Ensure it doesn't result in NaN

        // Calculate the updated streak
        const updatedStreak = streak > (userData.maxStreak || 0) ? streak : userData.maxStreak;



        // Ensure that points and streak are valid before updating
        if (updatedPoints === undefined || updatedStreak === undefined) {
          console.error("Invalid points or streak value");
          return;
        }

        // Update Firestore with new points (stTock) and max streak (maxStreak)
        await updateDoc(userDoc.ref, {
          stTock: updatedPoints, // Add the points to the current points
          maxStreak: updatedStreak, // Update streak only if it's higher than the current one
          stZmag: updatedStZmag,
          gamesPlayed: updatedStIger,
          WR: updatedWR
        });

        console.log(`Points and streak updated for ${userEmail}`);
      } else {
        console.log("User document not found!");
      }
    } else {
      console.log("No user is logged in.");
    }
  } catch (error) {
    console.error("Error updating points:", error);
  }
};
