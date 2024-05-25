import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useDeleteSongById = (id?: string | null) => {
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id || id==='') {
      return;
    }


    const deleteSong = async () => {
        const { error } = await supabaseClient
        .from('songs')
        .delete()
        .eq('id', id)
      
    }

    deleteSong();
  }, [id, supabaseClient]);

};

export default useDeleteSongById;
