import {supabaseActions} from "@/actions/supabaseActions";

const supabase = supabaseActions;

async function getLatestUserWithNullUsername() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .is('username', null)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching latest user with null username:', error.message);
        return null;
    }

    if (data && data.length > 0) {
        const latestUser = data[0];
        return latestUser;
    }

    return null;
}

async function updateUsername(userId: string, newUsername: string) {
    const { data, error } = await supabase
        .from('users')
        .update({ username: newUsername })
        .eq('id', userId);

    if (error) {
        console.error('Error updating username:', error.message);
        return false;
    }

    return true;
}

async function updateLatestUserWithNullUsername(newUsername: string) {
    const latestUser = await getLatestUserWithNullUsername();
    if (latestUser) {
        const success = await updateUsername(latestUser.id, newUsername);
        if (success) {
            console.log('Username updated successfully');
        } else {
            console.error('Failed to update username');
        }
    } else {
        console.log('No user with null username found');
    }
}

// Usage
export default updateLatestUserWithNullUsername