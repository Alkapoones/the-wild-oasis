import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error(`Cabins couldn't be loaded`);
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    console.log(newCabin, id);

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );
    const imagePath = hasImagePath
        ? newCabin?.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // https://idtlbgdjeeziitvoxffj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    // 1. Create cabin

    let query = supabase.from('cabins');

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq('id', id)
            .select();

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error(`The cabin couldn't be created!`);
    }

    // 2. Upload image
    if (hasImagePath) return data;
    const { error: storageErorr } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading image
    if (storageErorr) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageErorr);
        throw new Error(
            `The cabin image couldn't be uploaded and the cabin hasn't been created.`
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error(`The cabin couldn't be deleted`);
    }

    return data;
}
