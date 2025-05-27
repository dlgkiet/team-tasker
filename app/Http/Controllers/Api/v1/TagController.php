<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::all();
            return $this->sendResponse($tags, 'Tags retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve tags.', [$e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:tags,name',
            ]);

            $tag = Tag::create([
                'name' => $request->name,
            ]);

            return $this->sendResponse($tag, 'Tag created successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to create tag.', [$e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $tag = Tag::find($id);
            if (!$tag) {
                return $this->sendError('Tag not found.', [], 404);
            }
            return $this->sendResponse($tag, 'Tag retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve tag.', [$e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tag = Tag::find($id);
            if (!$tag) {
                return $this->sendError('Tag not found.', [], 404);
            }

            $request->validate([
                'name' => 'required|string|max:255|unique:tags,name,' . $id,
            ]);

            $tag->update(['name' => $request->name]);

            return $this->sendResponse($tag, 'Tag updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update tag.', [$e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $tag = Tag::find($id);
            if (!$tag) {
                return $this->sendError('Tag not found.', [], 404);
            }

            $tag->delete();
            return $this->sendResponse([], 'Tag deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to delete tag.', [$e->getMessage()], 500);
        }
    }
}
