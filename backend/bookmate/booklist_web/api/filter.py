from django_filters import rest_framework as fil
from booklist_web.models import Book,Genre
from django.db.models import Q
from rest_framework import filters
import re
# from rest_framework.filters import SearchFilter, OrderingFilter

class BookFilter(fil.FilterSet):
    genres = fil.ModelMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        field_name='genres__name',
        to_field_name='name',
        conjoined=True
    )
    price = fil.CharFilter(field_name='price', method='filter_price')


    class Meta:
        model = Book
        fields = ['genres', 'price']

    def filter_genres(self, queryset, name, value):
        return queryset.filter(genres__contains=[value])

    def filter_price(self, queryset, name, value):
        match = re.match(r'([<>]?)(\d+)', value)
        if not match:
            return queryset
        operator, amount = match.groups()
        amount = float(amount)

        if operator == '>':
            return queryset.filter(price__gt=amount)
        elif operator == '<':
            return queryset.filter(price__lt=amount)
        else:
            return queryset.filter(price=amount)

class BookSearchFilter(filters.SearchFilter):
    def filter_queryset(self, request, queryset,view):
        search_fields = {
            'search-title': 'title__icontains',
            'search-author': 'author__icontains',
        }

        query = Q()
        for param, field in search_fields.items():
            value = request.query_params.get(param)
            if value:
                query |= Q(**{field: value})
        if query:
            return queryset.filter(query)
        return queryset

class OrderingBook(filters.OrderingFilter):
    ordering_param = 'sortBy'
    field_name_mapping = {
        'recently' : 'createdAt',
        'date': 'releaseDate',
    }

    def get_ordering(self, request, queryset, view):
        params = request.query_params.get(self.ordering_param)
        if params:
            fields = [param.strip() for param in params.split(',')]
            ordering = []

            for field in fields:
                if field == 'title' or field == 'price':
                    if field.startswith('-'):
                        field_name = field[1:]
                        prefix = '-'
                    else:
                        field_name = field
                        prefix = ''

                else:
                    if field.startswith('-'):
                        field_name = field[1:]
                        prefix = ''
                    else:
                        field_name = field
                        prefix = '-'

                # Use the mapping if it exists, otherwise use the original field name
                mapped_field = self.field_name_mapping.get(field_name, field_name)
                ordering.append(f"{prefix}{mapped_field}")

            return ordering

        return self.get_default_ordering(view)





