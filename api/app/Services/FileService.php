<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     * Upload a file and return its absolute URL.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @return string
     */
    public function upload(UploadedFile $file, string $directory = 'uploads'): string
    {
        $path = $file->store($directory, 'public');
        return config('app.url') . '/storage/' . $path;
    }

    /**
     * Delete a file by its URL.
     *
     * @param string|null $url
     * @return void
     */
    public function delete(?string $url): void
    {
        if (!$url)
            return;

        $storagePath = str_replace(config('app.url') . '/storage/', '', $url);
        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
        }
    }
}
