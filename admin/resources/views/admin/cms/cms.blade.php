@extends('admin.app.index')

@section('title')
    {{$section ?? 'Admin'}}
@stop

@section('content')

<div class="user-wrap">
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="row align-items-center mb-3">
                <div class="col"> 
                    <div class="fs-18 fw-600 color-white"> {{ ucfirst($section) }} </div>
                </div>
            </div>
            <hr class="mt-2 mb-3">
            <div class="tbl-rounded">
                <div class="tbl-body">
                    <table id="cms_table" class="table table-bordered fs-14 reflow-tbl">
                        <thead>
                            <tr class="bg-color-191919">
                                <th>Page Title</th>
                                <th class="action" width="100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if(isset($data) && count($data) > 0)
                                @foreach($data as $row)
                                    <tr>
                                        <td>{{ $row->name }}</td>
                                        <td>
                                            <div class="td-action">
                                                <a href="{{url($actionURL.'/edit/'.$row->slug)}}" class="ac-remove" title="Edit"><i class="fas fa-edit text-success fs-18"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            @else
                                <tr><td colspan="4" align="center">No record found.</td></tr>
                            @endif        
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                {{ $data->links() }}
            </div>
        </div>
    </div>
</div>
@endsection
@section('js')
    {{--<script type="text/javascript">
        gmx_app.getDataTable("cms_table");
    </script>--}}
@stop