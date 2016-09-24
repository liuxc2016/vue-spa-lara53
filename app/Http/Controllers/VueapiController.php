<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class VueapiController extends Controller
{
    //
    public function hello()
    {
    	$data = [
    		['name'=>'liuxc', 'pass'=>'12345'],
    		['name'=>'pmd', 'pass'=>'34561']
    	];
    	return response()->json($data);
    }
}
