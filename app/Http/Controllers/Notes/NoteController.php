<?php

namespace App\Http\Controllers\Notes;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Repository\Interfaces\NoteRepositoryInterface;

class NoteController extends Controller
{

    private $noteRepository;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(NoteRepositoryInterface $noteRepository)
    {
        $this->middleware(['auth','isAdmin']);
        $this->noteRepository = $noteRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('notes.index');
    }

    /**
     * Get All Employees using datatable
     *
     * @return \Illuminate\Http\Response
     */
    public function getData()
    {
        return $this->noteRepository->getData();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->noteRepository->destroy($id);
    }
}
