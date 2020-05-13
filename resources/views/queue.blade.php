@extends('layout')

@section('content')
    <div class="queue">
        <table>
            <thead>
                <tr>
                    @foreach($users->first()->getVisible() as $attributeName)
                        <th>
                            {{ $attributeName }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                    <tr>
                        @foreach($user->attributesToArray() as $attributeValue)
                            <td>
                                {{$attributeValue}}
                            </td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection