import {createClient} from "@supabase/supabase-js";
import {supabaseActions} from "@/actions/supabaseActions";
import {undefined} from "zod";

export const getUserData = async (id: string) => {
    if(!id){
        return []
    }
    try {

        const supabase = supabaseActions

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)

        // if (data) {
        //     console.log(data)
        // }

        if (error) {
            console.error('Error retrieving user:', error);
        }

        return (data as any) || [];
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
};

