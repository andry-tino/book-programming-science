<#
    Restores required Nuget packages.
#>

nuget install -OutputDirectory .\packages -ConfigFile .\nuget.config -ExcludeVersion
