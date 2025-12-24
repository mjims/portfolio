<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FileService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    /**
     * Handle file upload.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:5120', // 5MB limit
            'directory' => 'nullable|string'
        ]);

        $url = $this->fileService->upload(
            $request->file('file'),
            $request->input('directory', 'uploads')
        );

        return response()->json([
            'url' => $url
        ]);
    }
}
