from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # Add your custom fields to the fieldsets (for editing users)
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('full_name', 'role')}),
    )
    
    # Add your custom fields to the add_fieldsets (for creating users)
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('full_name', 'role')}),
    )

    # Display these columns in the user list view
    list_display = ['username', 'email', 'full_name', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_superuser']

admin.site.register(User, CustomUserAdmin)
